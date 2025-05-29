package sv.edu.udb.panventury_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.panventury_service.model.DetallePedido;
import sv.edu.udb.panventury_service.model.Pedido;
import sv.edu.udb.panventury_service.model.Producto;
import sv.edu.udb.panventury_service.service.PedidoService;
import sv.edu.udb.panventury_service.repository.ProductoRepository;

import java.util.List;
import java.util.Map;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/pedidos")
@RequiredArgsConstructor
public class PedidoController {

    private final PedidoService pedidoService;
    private final ProductoRepository productoRepository;

    @GetMapping
    public List<Pedido> getAllPedidos() {
        return pedidoService.findAll();
    }

    @GetMapping("/{id}")
    public Pedido getPedidoById(@PathVariable Long id) {
        return pedidoService.findById(id);
    }

    @PostMapping
    public Pedido createPedido(@RequestBody Pedido pedido) {
        // Asignar productos reales desde la base de datos
        for (DetallePedido detalle : pedido.getDetalles()) {
            Long productoId = detalle.getProducto().getId();
            Producto producto = productoRepository.findById(productoId).orElse(null);
            if (producto != null) {
                detalle.setProducto(producto);
                detalle.setPedido(pedido);
            }
        }

        return pedidoService.save(pedido);
    }

    @PutMapping("/{id}/estado")
    public ResponseEntity<Pedido> actualizarEstado(@PathVariable Long id, @RequestBody Map<String, String> estadoData) {
        Pedido pedido = pedidoService.findById(id);
        if (pedido == null) {
            return ResponseEntity.notFound().build();
        }
        pedido.setEstado(estadoData.get("estado"));
        Pedido actualizado = pedidoService.save(pedido);
        return ResponseEntity.ok(actualizado);
    }
}